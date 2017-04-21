#!/bin/bash

#
# Input parameters: $BRANCH_NAME $CHANGE_ID $BUILD_DISPLAY_NAME
# 

#Following are already available from shell environment
#BRANCH_NAME=$1
#CHANGE_ID=$2
#BUILD_DISPLAY_NAME=$3


if [ -z "$GIT_BRANCH" ] || [ -z "$GIT_COMMIT" ] || [ -z "$BUILD_DISPLAY_NAME" ]; then
    echo "Requires 3 parameters : branch, commit, build id ... aborting!"
    exit 1
fi

BRANCH=`echo $GIT_BRANCH | cut -d'/' -f2`
COMMIT=$GIT_COMMIT
BUILD=$BUILD_DISPLAY_NAME

# Constants
# The COLLECTION_UUID is specific to C2 Patterns Library named : Basic Items
# See JIRA EPS-938
COLLECTION_UUID=b28f1ffe-2008-4f5e-d559-83c8acd79316

# The pushEPS is run by Jenkins in the git project.
FILE_PATH=./lib


# Common upload function
function epsupload {
  file=$1
  epsItemName=$1

case $BRANCH in
    'dev')
        echo "processing branch : $BRANCH"
        instUrl="https://epspqa.stg-openclass.com/component-lib-dev/"
        deliveryUrl="http://component-lib-dev.pearson.com/c2"
        token="5adcb4cf-d56f-447d-a30d-2c6028aedbab"
        ;;
    'qa')
        echo "processing branch : $BRANCH"
        instUrl="https://epspqa.stg-openclass.com/component-lib-qa/"
        deliveryUrl="http://component-lib-qa.pearson.com/c2"
        token="b27559d1-1086-43c5-aa63-8850e0a9767c"
        ;;
    'stg'|'final')
        echo "processing branch : $BRANCH"
        instUrl="https://epspqa.stg-openclass.com/component-lib-stg/"
        deliveryUrl="http://component-lib-stg.pearson.com/c2"
        token="21a70322-45cf-4b90-a0b6-b9c047f3e3e8"
        ;;
    'ppe')
        echo "processing branch : $BRANCH"
        instUrl="https://epspqa.stg-openclass.com/component-lib-ppe/"
        deliveryUrl="http://component-lib-ppe.pearson.com/c2"
        token="072ed834-e5d5-45de-aa3c-4476155b0ee5"
        ;;
    'prod')
        echo "processing branch : $BRANCH"
        instUrl="http://eps.openclass.com/component-lib/"
        deliveryUrl="http://component-lib.pearson.com/c2"
        token="a94144c3-6065-4846-aa07-71ee730ae33c"
        ;;
    *)
        echo "Invalid branch : $BRANCH ... aborting!"
        exit 1
        ;;
esac

      desc="Build from branch : $BRANCH, commit : $COMMIT, build : $BUILD"
      body='{"collection":{"uuid":"'${COLLECTION_UUID}'"}, "metadata": "<xml><item><name>'${epsItemName}'</name><description>'${desc}'</description></item></xml>" }'
      #
      # Step 1
      #
      outStaging=`curl -s -D - -X POST --header "Content-Type: application/json" --header "Accept: application/json;charset=UTF-8" --header "X-Authorization: access_token=${token}" ${instUrl}api/staging`
      rcStaging=$?
      #response = HTTP 201
      #stageUUID='d1bae78f-b183-4fc4-904a-cf1865c12398'   (x-eps-stagingid: d1bae78f-b183-4fc4-904a-cf1865c12398 )

      httpCode=`echo $outStaging | grep "201 Created" | head -n1 |  cut -d' ' -f2`
      xEpsStagingid=`echo $outStaging | tr '\r' '\n' | grep "x-eps-stagingid" | cut -d' ' -f3`

      echo "Step 1 : Staging"
      echo "rcStaging : $rcStaging"
      echo "outStaging : $outStaging"
      echo "httpCode : >$httpCode<"
      echo "xEpsStagingid : >$xEpsStagingid<"

      if [ $rcStaging -ne 0 ] || [ $httpCode -ne 201 ]; then
          echo "Staging step failed. ... aborting!"
          exit 1
      fi
      if [ $xEpsStagingid = '' ]; then
          echo "Staging step failed. No x-eps-stagingid found. ... aborting!"
          exit 1
      fi

      #
      # Step 2
      #
      outUpload=`curl -s -i -H "Authorization:Bearer ${token}" "${instUrl}api/staging/${xEpsStagingid}/${file}" -T ${file}`
      rcUpload=$?
      #response = HTTP 200
      httpCode=`echo $outUpload | tr '\r' '\n' | grep "100 Continue" |  cut -d' ' -f2`
      httpCode2=`echo $outUpload | tr '\r' '\n' | grep "200 OK" |  cut -d' ' -f3`

      echo "Step 2 : Upload"
      echo "rcUpload : $rcUpload"
      echo "outUpload : $outUpload"
      echo "httpCode : >$httpCode<"
      echo "httpCode2 : >$httpCode2<"

      if [ $httpCode -ne 100 ] || [ $httpCode2 -ne 200 ]; then
          echo "Staging step failed. ... aborting!"
          exit 1
      fi

      #
      # Step 3
      #
      outItem=`curl -s -D - -X POST --header "Content-Type: application/json" --header "Accept: application/json;charset=UTF-8" --header "X-Authorization: access_token=${token}" -d "${body}" "${instUrl}api/item?file=${xEpsStagingid}"`
      rcItem=$?
      #response = HTTP 201
      #location = ''
      httpCode=`echo $outItem | grep "201 Created" | head -n1 |  cut -d' ' -f2`
      location=`echo $outItem | tr '\r' '\n' | grep "Location:" | cut -d' ' -f3`
      itemUUID=`echo $location | cut -d'/' -f7`
      accessUrl="${location}/file/${file}?access_token=${token}"
      akamaiUrl="${deliveryUrl}/${itemUUID}/${file}"

      echo "Step 3 : Item"
      echo "rcItem : $rcItem"
      echo "outItem : $outItem"
      echo "httpCode : >$httpCode<"
      echo "Location : >$location<"
      echo "accessUrl : >$accessUrl<"
      echo "akamaiUrl : >$akamaiUrl<"

      if [ $httpCode -ne 201 ]; then
          echo "Item step failed. ... aborting!"
          exit 1
      fi
      if [ $location = '' ]; then
          echo "Item step failed. No location url. ... aborting!"
          exit 1
      fi

# Notify HipChat about EPS details

hipChatApiToken="9ZguuMHwF8asRcKB8rC8c5EixxxAbYduZelZvuF7"
scriptOpen='<script src='
scriptClose='> </script>'
script=$scriptOpen$akamaiUrl$scriptClose

epsMsg="Branch : ${BRANCH} *** Commit : ${COMMIT} *** Build : ${BUILD} *** EPS Access URL : ${accessUrl} *** Akamai URL : ${akamaiUrl} *** Akamai URL script tag : ${script}"
curl -H "Content-type: application/json" -H "Authorization: Bearer ${hipChatApiToken}" -X POST -d "{ \"color\" : \"yellow\", \"notify\" : true, \"message\" : \"${epsMsg}\" }" https://pearson.hipchat.com/v2/room/3236763/notification

}

cd ${FILE_PATH}

# upload resource managed by EPS/AKAMAI
# epsupload PatternsLib.js
epsupload PatternAddAnAsset.js
epsupload PatternAssessment.js
epsupload PatternBank.js
epsupload PatternBroker.js
epsupload PatternProductLink.js
epsupload PatternQuestion.js
epsupload Patternvendor.js
epsupload SearchSCPatterns.js
epsupload PatternSearchSelect.js

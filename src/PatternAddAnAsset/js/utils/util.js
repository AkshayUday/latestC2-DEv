module.exports = {
    getCurrentValues: (dataArray) => {
      if (dataArray !== undefined && dataArray.size > 1) {
        let latestItem = dataArray.size-1;
        return dataArray.get(latestItem);
      }

      return [];
    },

    /**
    * this method is used to remove the unkown properties, that
    * has been added when we use {...props} from parent 
    * directly.
    **/
    removeUnkownProps(divProps){

	delete divProps.autofill;
    delete divProps.initialValue;
    delete divProps.onUpdate;
    delete divProps.valid;
    delete divProps.invalid;
    delete divProps.dirty;
    delete divProps.pristine;
    delete divProps.error;
    delete divProps.active;
    delete divProps.touched;
    delete divProps.visited;
    delete divProps.autofilled;
    return divProps;
	}
}

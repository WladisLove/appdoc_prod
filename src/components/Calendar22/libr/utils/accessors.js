function validateEditor(data,field){
  if(data.intervalOb.length !== 0)
    return data.intervalOb[0][field];
  if (data.intervalEx.length !== 0)
      return data.intervalEx[0][field];
}

export function accessor(data, field, editor) {
    var value = null

    if (typeof field === 'function') value = field(data)
    else if (
        typeof field === 'string' &&
        typeof data === 'object' &&
        data != null
    ) {

        value =
            editor ?
                validateEditor(data,field)
                :
                data[field];

        return value
    }
}

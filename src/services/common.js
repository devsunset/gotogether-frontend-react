class Common {
  preRequestHandler(reqData) {
    if (typeof reqData === 'object' && reqData !== null) {
      for (const [key, value] of Object.entries(reqData)) {
        if (
          value !== undefined &&
          value !== null &&
          typeof value == 'string' &&
          value != ''
        ) {
          reqData[key] = value.replace(/"/gi, "'");
        }
      }
      return JSON.stringify(reqData);
    } else {
      return reqData;
    }
  }
}

export default new Common();

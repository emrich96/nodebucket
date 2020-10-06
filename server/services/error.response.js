/**
 * Title: error.response.js
 * Author: Emily Richter
 * Date: 4 October 2020
 * Description: Sprint 2 -- error message template
 */

class ErrorResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = ErrorResponse;

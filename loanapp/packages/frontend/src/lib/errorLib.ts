/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
export function onError(error) {
    let message = String(error);
  
    if (!(error instanceof Error) && error.message) {
      message = String(error.message);
    }
  
    alert(message);
  }
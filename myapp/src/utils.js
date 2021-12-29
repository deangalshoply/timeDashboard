import { useEffect,useRef } from "react";

export function dateSlicer(date) {
    let fullDate = date.toJSON().slice(0, 10);
    let newDate = fullDate.slice(8, 10) + '/' 
               + fullDate.slice(5, 7) + '/' 
               + fullDate.slice(0, 4);
               return newDate
  }
  
export function currentTime() {
    let today = new Date();
    let time = today.toString().slice(16,21).replace(':','')
    return time
  }


export function stringToDate(date) {
    let yy = date.slice(6, 10)
    let mm = date.slice(3, 5)
    let dd = date.slice(0, 2);
  let dateFormatted = new Date(yy, mm-1, dd)            // the month is 0-indexed
    return dateFormatted
}

export function useKey(key, cb) {
  const callbackRef = useRef(cb)

  useEffect(() => {
      callbackRef.current = cb;
  });

  useEffect(() => {
      function handle(event) {
          if(event.key === key){
            callbackRef.current(event)  
          }
      }

      document.addEventListener("keydown",handle);
      return () => document.removeEventListener("keydown",handle)
  },[key])
}

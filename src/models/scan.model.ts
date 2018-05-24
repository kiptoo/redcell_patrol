export interface Scan {
  id: string,
  employee:{
  employeename:string,
  employeeid:string
  },
  assignment:string,
  tourstop:{
  stopname: string,
  stopid: string,
  }, 
  stop: string, 
  type:string,
  date: Date,
  time: number,
  long:number,
  lat: number
}
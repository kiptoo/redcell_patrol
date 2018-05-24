export interface Employee{
_id: string,
_rev: string,
employeeID: string,
name: string,
type: string,
accountnumber: string,
client: string,
assignment: string,
status: string,
salary: string,
account:{
	 username: string,
     password: string
},
sites:{
     sitename :string,
     siteid:string
    }


}
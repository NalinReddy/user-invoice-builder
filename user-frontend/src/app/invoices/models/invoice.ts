export class Invoice {
    _id:string;
    name:string;
    email:string;
    dob:Date;
    password:string;
    constructor(name:string,email:string,dob:Date,password?:string,_id?:string,){
        this.name=name;
        this.email=email;
        this.dob = dob;
        this.password=password;
        this._id=_id;
    };

}

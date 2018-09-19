export class User {
    _id:string;
    name:string;
    email:string;
    dob:Date;
    password:string;
    createdAt:Date;
    constructor(name:string,email:string,dob:Date,password:string,_id?:string,createdAt?:Date){
        this.name=name;
        this.email=email;
        this.dob=dob;
        this.password=password;
    };
}

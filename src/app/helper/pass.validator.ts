import { FormGroup } from "@angular/forms";

export function mustMatch(password : string , cmpPassword : string){
    return (formGroup : FormGroup) =>{
        const Npassword = formGroup.controls[password]
        const NcmpPassword = formGroup.controls[cmpPassword]

        if(NcmpPassword.errors && !NcmpPassword.errors['mustMatch']){
            return ;
        }
        

        if(Npassword.value !== NcmpPassword.value){
            return NcmpPassword.setErrors({mustMatch : true})
        }
        else{
            return NcmpPassword.setErrors(null)
        }
    }

}
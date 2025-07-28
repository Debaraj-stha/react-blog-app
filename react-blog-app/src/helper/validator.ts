import { emailRegex, nameRegex } from "./regex";

export const namaValidator = (name: string) => {

    let errorMsg = "";
    if (name.trim() === "") {
        errorMsg = "Name is empty. Whitespace is not allowed";
    } else if (name.length < 3) {
        errorMsg = "Name must be at least 3 characters long";
    } else if (!nameRegex.test(name)) {
        errorMsg = "Invalid Name. Only letters (3–15 chars) are allowed";
    } else if (name.length > 15) {
        errorMsg = "Invalid name length, maximum of 15 characters are accepted";
    }
    else {
        errorMsg = ""
    }
    return errorMsg


}



export const emailValidator = (email:string) => {

    let errorMessage = ""
    if (email.trim() === "") {
        errorMessage = "Email is required"
    }
    else if (!emailRegex.test(email!)) {
        errorMessage = "Invalid email address.Please enter valid email address"
    }
    else {
        errorMessage = ""
    }
    return errorMessage

}
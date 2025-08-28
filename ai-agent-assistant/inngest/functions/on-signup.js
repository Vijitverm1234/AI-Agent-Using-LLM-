import { NonRetriableError } from "inngest";
import User from "../../models/user.js";
import { sendMail } from "../../utils/mailer.js";
import { inngest } from "../client.js";
export const onUserSignup=inngest.createFunction(
    {id:"on-user-signup",retries:2},
    {event:"user/signup"},
    async({event,step})=>{
        try {
            const {email}=event.data;
           const user= await step.run("get-user-email",async()=>{
               const userobj=await User.findOne({email})
               if(!userobj){
                throw new NonRetriableError("User No longer exists in our database");
               } return userobj;

            })
           await step.run("send-welcome-email",async()=>{
                   const subject=`welcome to the app`
                   const message=`Hi, \n \n
                   Thank you signing in . we are glad to have ya onboard
                   `
                   await sendMail(user.email,subject,message)
           })
           return {sucess:true}
        } catch (error) {
            console.log("🥹 Error occured")
        }
    }
)
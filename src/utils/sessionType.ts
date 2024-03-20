export type UserType = {
      email  :String
      name :String
      profile_pic_url :String
      token : String
      user_id : Number
   }
   
   
   export type SessionType = {
     data: {
       expires  : string
       jwt : string
       user: UserType
     }
     status: "loading" | "authenticated" | "unathenticated"
   }
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from "../db";



passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,

    },
        async (accessToken, refreshToken, profile, done) => {
            try{
                let user = await User.findOne({ email: profile.emails![0].value  })
                if (!user) {
                    user =  new User({
                        name: profile.displayName,
                        email: profile.emails![0].value,
                        googleId: profile.id
                    })
                  
                    await user.save()
                    console.log("so this is user here ",user)
                    
                }else{
                    console.log("so the useer is already in the market ",user)
                }
                done(null, user)
            
            }catch(e){
                console.log("something went wrong in google authenticaton ",e)
            }
        }   
    )

)

passport.serializeUser((user, done) => {
    console.log("serialise user ",user)
    done(null, (user as any).id);
})
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    console.log("deserialised user ",user)
    done(null,user)
})
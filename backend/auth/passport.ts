import { access } from "fs";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


const users: { id: string; email: string; password?: string; googleId?: string }[] = [];

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,

    },
        (accessToken, refreshToken, profile, done) => {
            let user = users.find((user) => {
                user.googleId === profile.id
            })
            if (!user) {
                user = { id: `${users.length + 1}`, email: profile.emails![0].value, googleId: profile.id }
            }
            done(null, user)
        }
    )

)

passport.serializeUser((user, done) => {
    done(null, (user as any).id);
})
passport.deserializeUser((id, done)=>{
    done(null,users.find((user) => {
        user.id ===id
    }))
})
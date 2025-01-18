import { Quote } from "../components/Quote"
import {Auth} from "../components/Auth"

export const Signup = () => {
    return <div className="grid lg:grid-cols-2">
        <div>
            <Auth type="signup"/>
        </div>
        <div className="invisible lg:visible">
            <Quote/>
        </div>
    </div>
}
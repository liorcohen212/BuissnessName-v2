import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";

interface AboutProps {
    
}

const About: FunctionComponent<AboutProps> = () => {
    let theme = useContext(SiteTheme)
    return (<>
    <div style={{color: theme.color, background: theme.background}}>
        <h1 className="pt-5">About our site</h1>
        <h3>Our purpose</h3>
        <p style={{fontSize: 24}}>Our site is meant for bussinesses to publish their bussiness in a form of cards that show the name proffession address and phone number
            so that a client can reach you easily and this site gives you the opretonity to public your bussiness
            in a big site to a variety of people  in the most efficient and 
            easiest way possible
        </p>
        <p style={{fontSize: 24}}>the site is also made for customers to find a variety of bussinesses that can assist them in 
            almost any need they have in just 2 simple clicks to make their life easier and better
        </p>
        <h3 >How to use our site</h3>
        <p style={{fontSize: 24}}><b>opening and account: </b>first of all you need to open an account by clicking on Signup,fill all the needed 
        information (make sure you fill all the neccesery information and that your password meet the requirement) select if your a bussiness 
        or a regular customer click on register and youre good to go
        </p>
        <p style={{fontSize: 24}}><b>Look for a bussiness:</b>on Youre navigation bar you can type the needed Bussiness to find the bussiness you desire,
        the bussinesses are presented by cards and showing their name proffession phone number and address,
        by pressing the photo on the card youd be transported to a page with all the links and information about the bussiness,
        on the botton of the card you can select either to call them using the phone sign or add that bussiness to your favorites </p>
        <p style={{fontSize: 24}}><b>post a new card: </b>a option only for those who have a bussiness account you can see on the upper side of the page a button to add a new card,
        you would be transported to a page to create your card all you need to do is write all your information and can add a photo if youd like click on add card and you have added a new card (make sure you enter your email under owner label so that the card will be linked to you)</p>
        <p style={{fontSize: 24}} className="pb-5"><b>all the cards options:</b> a bussiness account has the possibillity also to change is card simply by pressing the sign on the bottom of the card and simply change what need to be changed,
        you also have the option to view all of your cards by clicking my cards on the navigation bar or the bottom of the page</p>
        <p style={{fontSize: 24}}><b>update user settings:</b> by clicking on the person image on your navbar youll enter your user info, there you can change your password email and all the otther information displayed</p>
        <p style={{fontSize: 24, paddingBottom: 15, marginBottom: 0}}><b>our policies:</b>The admin as the autority to delete any card that is offensive or unbeffiting to our site</p>
    </div>

    </>);
}

export default About;
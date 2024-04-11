import style from "./style.module.scss";
const { container } = style
const About = () => {
    return (<section className={container}>
        <h2>About</h2>
        <p className="text-xl pb-3">Welcome to BizCardHub, the innovative platform that transforms the way professionals and businesses connect.In the digital era, where first impressions are often made online, we believe in the power of a well-designed business card.Our platform serves as a dynamic gallery, showcasing a diverse collection of business cards from various industries and professions.Whether you're seeking inspiration, looking to network, or aiming to stand out in your field, BizCardHub is your go-to destination.</p>
        <h3 className="">For visitors:</h3>
        <p className="pb-3">Explore an expansive collection of business cards with ease. Each card is a unique reflection of its owner's brand and professional identity. Our intuitive interface allows you to view, like, and discover business cards that resonate with you or your business needs. Engage with innovative designs, creative expressions, and professional identities from around the globe.</p>
        <h3 className="text-lg font-semibold pb-1">For business account holders</h3>
        <p className="pb-3">BizCardHub offers an exclusive opportunity for professionals and businesses to showcase their brand to a wide audience. By uploading your business card, you become part of a professional community that values quality, design, and connectivity. Increase your visibility, connect with potential clients or partners, and make a lasting impression. Our platform is designed to elevate your professional identity and foster meaningful business connections.
        </p>
        <h3 className="text-lg font-semibold pb-1">Our Mission:</h3>
        <p className="pb-3">At BizCardHub, our mission is to redefine professional networking by providing a platform that not only showcases the creativity and diversity of business cards but also facilitates connections that lead to growth opportunities. We believe in the importance of a memorable business card and strive to create a space where these powerful tools can be shared and appreciated.
        </p>
    </section>
    )
}

export default About
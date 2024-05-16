import Banner from "./componets/Banner";
import Blog from "./componets/Blog";
import New from "./componets/New";
import Services from "./componets/Services";
import Shop from "./componets/Shop";

  const HomePage = () => {
    return (
      <div>
      
        <Banner />
        {/*End .banner*/}
        <div className="container">
          <hr />
        </div>
        <New />
        {/*End .news*/}
        <Shop />
        {/*End .shop*/}
        <Blog />
        {/*End .blog*/}
        <Services />
        {/*End .services*/}
       
        {"}"}
      </div>
    );
  };
  
  export default HomePage;
  
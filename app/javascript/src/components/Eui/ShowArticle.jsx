// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Typography } from "@bigbinary/neetoui";
// import euiApi from "../../apis/eui";
// import { PageLoader } from "@bigbinary/neetoui";
// const ShowArticle = (urlSlug) => {
//   const [article, setArticle] = useState()
//   const [pageLoading, setPageLoading] = useState(true);
//   const { slug } = useParams();
//   const fetchArticleDetails = async () => {
//     // if slug == null{
//     //   setPageLoading(false);
//     // }
//     try {
//       const response = await euiApi.show(slug);
//       setArticle(response.data.task);
//     } catch (error) {
//       logger.error(error);
//     } finally {
//       setPageLoading(false);
//     }
//   };
//   useEffect(() => {
//     setPageLoading(false);
//     // fetchArticleDetails();
//   }, []);

//   if (pageLoading) {
//     return (
//       <div className="h-screen w-screen">
//         <PageLoader />
//       </div>
//     );
//   }
//   return(
//     <div>
//       <Typography style="h2">
//         Typography
//         {/* {article} */}
//       </Typography>
//     </div>
//   )
// }
// export default ShowArticle

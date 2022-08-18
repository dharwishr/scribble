import React from "react";

import { Typography, Tag } from "@bigbinary/neetoui";

import versionsApi from "apis/versions";

const VersionHistory = ({
  setRestoringArticle,
  setShowModal,
  articleVersions,
  slug,
}) => {
  const versionOnClickHandle = async versionId => {
    try {
      const response = await versionsApi.show({ slug, versionId });
      setRestoringArticle(response.data.article_version);
      setShowModal(true);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="w-2/8 mr-10 h-screen border-l-2 pt-10 pl-5">
      <Typography style="h2">Version History</Typography>
      <Typography style="body1">
        Version history of Setting up an account in Scribble.
      </Typography>
      <ul className="mt-5">
        {articleVersions.map((articleVersion, index) =>
          index + 1 === articleVersions.length ? (
            <li key={index} className="mb-2">
              <Tag
                color="green"
                label={
                  <Typography style="h4">
                    {articleVersion.time}
                    <span className="ml-3 text-indigo-500">
                      Article {articleVersion.event}
                    </span>
                  </Typography>
                }
                size="large"
                style="outline"
              />
            </li>
          ) : (
            <li
              onClick={() => versionOnClickHandle(index)}
              key={index}
              className="mb-2 cursor-pointer"
            >
              <Typography style="h4">
                {articleVersion.time}
                <span className="ml-3 text-indigo-500">
                  Article {articleVersion.event}
                </span>
              </Typography>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default VersionHistory;

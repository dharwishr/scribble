import React from "react";

import { Typography, Modal, Button, Textarea, Input } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

const RestoreArticleModal = ({
  showModal,
  setShowModal,
  slug,
  restoringArticle,
}) => {
  const history = useHistory();

  const versionRestoreHandle = async () => {
    try {
      await articlesApi.update({
        slug,
        payload: restoringArticle,
        restore: true,
      });
      history.push("/");
      setShowModal(false);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <Typography style="h2" id="dialog1Title">
          Version History
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Typography style="body2" lineHeight="normal">
          Version history of Setting up an account in Scribble.
        </Typography>
        <div className="w-full">
          <div className="grid grid-cols-2 space-x-20">
            <Input
              disabled
              label="Article Title"
              placeholder={restoringArticle.title}
            />
            <Input
              disabled
              label="Category"
              placeholder={restoringArticle.category_title}
            />
          </div>
          <Textarea
            disabled
            label="Article Body"
            rows="20"
            placeholder={restoringArticle.body}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button
          label="Continue"
          onClick={() => versionRestoreHandle()}
          size="large"
        />
        <Button
          style="text"
          label="Cancel"
          onClick={() => setShowModal(false)}
          size="large"
        />
      </Modal.Footer>
    </Modal>
  );
};
export default RestoreArticleModal;

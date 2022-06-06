import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Textarea } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui";
import { Dropdown } from "@bigbinary/neetoui";
import { Button } from "@bigbinary/neetoui";

const ArticleForm = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const listItems = ["Hello", "1234"];
  useEffect(() => {
    setPageLoading(false);
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <form className="mx-auto max-w-lg">
      <Input label="Article Title" required={true} />
      <Textarea label="Article Body" required={true} />
      <div className="flex">
        <Dropdown position="bottom" label="Dropdown" isMultiLevel>
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
          <Dropdown
            position="right-start"
            customTarget={<li>Another Dropdown</li>}
            onClick={e => e.stopPropagation()}
          >
            {listItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </Dropdown>
        </Dropdown>
      </div>

      <Button label="Button" onClick={function noRefCheck() {}} style="text" />
    </form>
  );
};

export default ArticleForm;

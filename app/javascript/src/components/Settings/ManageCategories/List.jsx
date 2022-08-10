import React, { useState, useEffect } from "react";

import { Check, Close, Reorder, Delete, Edit } from "@bigbinary/neeto-icons";
import { Typography, Button, Input } from "@bigbinary/neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

const List = ({ categories, fetchCategories }) => {
  const [categoryId, setCategoryId] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateCategory = async () => {
    try {
      await categoriesApi.update({
        id: categoryId,
        payload: {
          title: categoryTitle,
        },
      });
      setCategoryId(0);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const updatePosition = async ({ id, position }) => {
    try {
      await categoriesApi.update({
        id,
        payload: {
          position,
        },
      });
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const destroyCategory = async categoryId => {
    try {
      await categoriesApi.destroy(categoryId);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    updatePosition({
      id: result.draggableId,
      position: result.destination.index + 1,
    });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="categories">
        {provided => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map(({ id, title }, position) => (
              <Draggable key={id} draggableId={String(id)} index={position}>
                {provided => (
                  <li
                    key={id}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {categoryId !== id && (
                      <div className="border-t flex items-center justify-between space-x-2 p-3">
                        <div className="flex items-center space-x-2">
                          <Reorder />
                          <Typography size="body2" weight="medium">
                            {title}
                          </Typography>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            style="text"
                            icon={Delete}
                            onClick={() => {
                              destroyCategory(id);
                            }}
                          />
                          <Button
                            style="text"
                            icon={Edit}
                            onClick={() => {
                              setCategoryId(id);
                              setCategoryTitle(title);
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {categoryId === id && (
                      <div className="border-t flex p-3">
                        <Input
                          value={categoryTitle}
                          onChange={e => setCategoryTitle(e.target.value)}
                        />
                        <Button
                          icon={Check}
                          onClick={() => updateCategory()}
                          style="secondary"
                        />
                        <Button
                          icon={Close}
                          onClick={() => {
                            setCategoryId(0);
                          }}
                          style="secondary"
                        />
                      </div>
                    )}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;

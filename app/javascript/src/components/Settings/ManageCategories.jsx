import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui";
import { PageLoader } from "@bigbinary/neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
      setUpdatedCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setUpdatedCategories(items);
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 space-y-5">
      <Typography style="h2">Manage Categories</Typography>

      <Typography style="body2">
        Create and configure the categories inside your scribble.
      </Typography>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {provided => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {updatedCategories.map(({ id, category }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {provided => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="characters-thumb"></div>
                      <p>{category}</p>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default ManageCategories;

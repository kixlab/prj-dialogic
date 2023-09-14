/* eslint-disable @typescript-eslint/no-explicit-any */

import { RegularText } from "@/styles/text";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import styled from "styled-components";
import DialogueItem from "./dialogueItem";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { useDispatch } from "react-redux";
import { updateDialogue, updateTitle } from "@/states/dialogueSlice";
import { AuthorMode, UtteranceItem } from "@/states/types";

const DialogueAuthor = (props: { mode: AuthorMode }) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.dialogue.dialogue);
  const title = useSelector((state: RootState) => state.dialogue.title);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const itemsContainer = document.getElementById("itemsContainer");
    if (!itemsContainer) return;
    setWidth(itemsContainer.clientWidth);
  }, [props.mode]);

  const onDragEnd = (result: any) => {
    // for dragdrop context
    if (!result.destination) return;
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(updateDialogue(newItems));
  };
  return (
    <DialogueAuthorWrapper>
      <DialogueTitleWrapper>
        <RegularText text={"VIVID"} color="gray350" size={12} />
        <DialogueTitle
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(updateTitle(e.target.value))
          }
          style={{ width }}
        />
      </DialogueTitleWrapper>
      <DialogueItemsWrapper id="itemsContainer">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ width: "100%" }}
              >
                {items.map((value: UtteranceItem, idx) => (
                  <Draggable
                    draggableId={"draggable" + value.id.toString()}
                    key={"draggable" + value.id.toString()}
                    index={idx}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          padding: "6px 0px",
                        }}
                      >
                        <DialogueItem
                          {...value}
                          isDragging={snapshot.isDragging}
                          width={width}
                          idx={idx}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DialogueItemsWrapper>
    </DialogueAuthorWrapper>
  );
};

export default DialogueAuthor;

const DialogueAuthorWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
  padding: 25px 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const DialogueTitle = styled.input`
  box-sizing: border-box;
  outline: none;
  border: none;

  font-size: 20px;
  font-weight: 700;
`;

const DialogueTitleWrapper = styled.div`
  box-sizing: border-box;
  padding: 0px 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1px;
`;

const DialogueItemsWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

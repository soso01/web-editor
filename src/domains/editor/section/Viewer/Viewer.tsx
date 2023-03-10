import { IBlock } from '@/domains/blocks';
import styled from '@emotion/styled';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { BlockWrap } from './BlockWrap';

interface Props {
  blocks: IBlock[];
  focusBlock?: IBlock;
  setFocusBlock: (block?: IBlock) => void;
}

export const Viewer = ({ blocks, focusBlock, setFocusBlock }: Props) => {
  const clearFocus = () => setFocusBlock(undefined);

  return (
    <Wrap onClick={clearFocus}>
      <p>Viewer</p>
      <hr />
      <Droppable droppableId="blockList">
        {(droppableProvided) => (
          <BlockList ref={droppableProvided.innerRef}>
            {blocks.map((block, index) => {
              return (
                <Draggable
                  key={block.getId()}
                  draggableId={block.getId()}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={getItemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style
                      )}
                    >
                      <BlockWrap
                        block={block}
                        isFocusBlock={block === focusBlock}
                        setFocusBlock={setFocusBlock}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </BlockList>
        )}
      </Droppable>
    </Wrap>
  );
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  background: isDragging ? 'lavender' : undefined,
  ...draggableStyle,
});

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlockList = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  border: 1px solid lavender;
  border-radius: 12px;
`;

import styled from "styled-components";
import { getStrategy, getTagTheme } from "../utils";
import Tag from "../components/tag";

const StrategyTag = ({ strategy }: { strategy: string[] }) => {
  return (
    <StrategyTagWrapper>
      {strategy.map((title) => (
        <Tag
          key={title}
          title={getStrategy(title).title}
          description={getStrategy(title).description}
          theme={getTagTheme(title)}
        />
      ))}
    </StrategyTagWrapper>
  );
};
export default StrategyTag;

const StrategyTagWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

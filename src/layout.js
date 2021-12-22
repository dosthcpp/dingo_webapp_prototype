import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const MessageBubbleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const MessageBubbleColumn = styled.div`
  display: "flex";
  flex-direction: "column";
  height: 300px;
`;

export const RowNormal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const RowCentered = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RowRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Column = styled.div`
  display: "flex";
  flex-direction: "column";
`;

export const ColumnCentered = styled.div`
  display: "flex";
  flex-direction: "column";
  justify-content: center;
`;

export const ColumnWithWidth = styled.div`
  display: "flex";
  flex-direction: "column";
  width: 300px;
  align-items: center;
  justify-content: center;
`;

export const SizedBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const SizedBoxWithElevation = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.8);
`;

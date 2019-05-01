import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
      border-radius: 50%;
    }
    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }
  footer {
    display: flex;
    justify-content: space-around;
    padding-right: 0 10px 10px 0;
    margin-bottom: 10px;
    button {
      height: 40px;
      width: 60px;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;
      font-size: 18px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
        padding-left: 5px;
      }

      &:nth-child(2n-1) {
        background-color: #f5f5f5;
      }
    }
  }
`;

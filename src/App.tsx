import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getPostItem } from "./post-item-slice";
import { getPostList } from "./post-list-slice";

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/:id" element={<PostItem />} />
      </Routes>
    </BrowserRouter>
  );
};

const PostList: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const record = useAppSelector((state) => state.postList.record);

  React.useEffect(() => {
    dispatch(getPostList());
    // eslint-disable-next-line
  }, []);

  const postList = React.useMemo(() => record["post-list"], [record]);

  return (
    <div>
      <h1>{`Post List`}</h1>
      <ul>
        {postList?.map((item: any, index: number) => (
          <li key={index}>
            <h2>
              <Link to={`/${item.id}`}>{item.title}</Link>
            </h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PostItem: React.FC = (): JSX.Element => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const record = useAppSelector((state) => state.postItem.record);

  React.useEffect(() => {
    if (!params?.id) return;

    dispatch(getPostItem(params.id));
    // eslint-disable-next-line
  }, [params]);

  const postItem = React.useMemo(() => {
    if (!params?.id) return null;

    return record[params.id];
  }, [record, params]);

  return (
    <div>
      <Link to={`/`}>{`Go back`}</Link>
      <h1>{`Post Item`}</h1>
      <div>
        <h2>{postItem?.title}</h2>
        <p>{postItem?.body}</p>
      </div>
    </div>
  );
};

export default App;

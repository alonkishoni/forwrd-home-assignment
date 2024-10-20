import { memo } from 'react';
import MemoizedUserRow from '../UserRow.jsx';
import { areEqual } from 'react-window';

export const VirtualizedRowWrapper = memo(({ data, index, style }) => {
  const { filteredTempUsers, handleDelete, handleInputChange } = data;
  const user = filteredTempUsers[index];

  if (!user) {
    return null; // Render nothing if user is not available
  }

  return (
    <MemoizedUserRow
      key={user.id}
      index={index}
      style={style}
      user={user}
      handleDelete={handleDelete}
      handleInputChange={handleInputChange}
    />
  );
}, areEqual);

VirtualizedRowWrapper.displayName = 'VirtualizedRowWrapper';

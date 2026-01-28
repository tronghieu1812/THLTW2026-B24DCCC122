import { Input } from 'antd';

interface InputSearchProps {
  onSearch: (value: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ onSearch }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Input.Search
        placeholder="Tìm kiếm"
        allowClear
        enterButton
        onChange={e => onSearch(e.target.value)}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default InputSearch;
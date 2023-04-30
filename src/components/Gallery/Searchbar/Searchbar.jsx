import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ImSearch } from 'react-icons/im';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={clsx('Searchbar')}>
      <form className={clsx('SearchForm')} onSubmit={handleSubmit}>
        <button type="submit" className={clsx('SearchForm-button')}>
          <ImSearch />
        </button>
        <input
          className={clsx('SearchForm-input')}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

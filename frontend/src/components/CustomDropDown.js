import { React, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from "react-bootstrap/Container";

const CustomDropDown = ({ title, items, func, scroll }) => {
  function handleClick(value) {
    setSelectedOption(value);
    func(value);
  }

  const [selectedOption, setSelectedOption] = useState(title);

  return (
    
    <DropdownButton
      id="dropdown-basic-button"
      className="dropdown-button"
      title={selectedOption}
      // variant='secondary'
    >
      <Container style={scroll ? { height: "8rem", overflowY: "scroll" } : {}}
      >
        
        {items.map((item) => {
          return (
            <Dropdown.Item onClick={() => handleClick(item)}>
              {item}
            </Dropdown.Item>
          );
        })}
      </Container>
    </DropdownButton>
  );
};

export default CustomDropDown;

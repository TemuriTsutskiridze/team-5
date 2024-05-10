import styled from "styled-components";
import Title from "./Title";
import Headline from "./Headline";
import React, { useState, useRef, useEffect } from "react";
import ArrowDown from "/assets/shared/icon-arrow-down.svg";
import CheckIcon from "/assets/shared/icon-check.svg";
import { MyContext } from "../../../App";
import { useContext } from "react";
import { useLocation } from "react-router";

export default function Category({ setValue, category }) {
  const pathname = useLocation().pathname.split("/").at(-1);

  const allCategories = ["feature", "UI", "UX", "enhancement", "bug", "Other"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(allCategories[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (pathname === "edit-feedback") {
      setSelectedOption(category);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((state) => !state);

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setValue("category", option);
  };

  return (
    <>
      <CategoryContainer ref={dropdownRef}>
        <Title>Category</Title>
        <Headline>Choose a category for your feedback</Headline>
        <DropdownSelected isOpen={isOpen} onClick={toggleDropdown}>
          {selectedOption}
          <DropdownIcon src={ArrowDown} alt="dropdown arrow" isOpen={isOpen} />
        </DropdownSelected>
        {isOpen && (
          <DropdownList>
            {allCategories.map((option, index) => (
              <DropdownOption
                key={index}
                onClick={() => handleSelection(option)}>
                {option}
                {option === selectedOption && (
                  <img src={CheckIcon} alt="Checked" />
                )}
              </DropdownOption>
            ))}
          </DropdownList>
        )}
      </CategoryContainer>
    </>
  );
}

const CategoryContainer = styled.div`
  font-size: 13px;
  position: relative;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const DropdownSelected = styled.div`
  background: rgba(247, 248, 253, 1);
  width: 279px;
  height: 48px;
  margin-top: 16px;
  border-radius: 6px;
  padding: 15px;
  font-family: Jost;
  font-weight: 400;
  line-height: 21.68px;
  color: rgba(58, 67, 116, 1);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${(props) => (props.isOpen ? "1px solid rgba(70, 97, 230, 1)" : "")};

  @media (min-width: 768px) {
    width: 456px;
  }
`;

const DropdownIcon = styled.img`
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  width: 100%;
  border-radius: 6px;
  box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.35);
  padding: 10px 0;
  z-index: 1;
`;

const DropdownOption = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid rgba(58, 67, 116, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Jost;
  font-weight: 400;
  line-height: 21.68px;
  color: rgba(100, 113, 150, 1);

  &:last-child {
    border-bottom: none; // Remove border for the last item
  }

  &:hover {
    background-color: rgba(247, 248, 253, 1);
    color: rgba(173, 31, 234, 1);
  }
`;

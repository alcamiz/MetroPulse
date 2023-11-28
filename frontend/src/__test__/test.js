/**
* @jest-environment jsdom
*/

import React from "react"
import renderer from "react-test-renderer"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import HoodCard from "../components/Hoods/HoodCard.js"
import CenterCard from "../components/Centers/CenterCard.js"
import MedicalCard from "../components/Medicals/MedicalCard.js"
import MedicalDetails from "../components/Medicals/MedicalDetails.js"
import HoodDetails from "../components/Hoods/HoodDetails.js"
import CenterDetails from "../components/Centers/CenterDetails.js"
import Navbar from "../components/Navbar.js"
import Loading from "../components/Loading.js"
import medical_test_json from "./medical_test.json"
import hood_test_json from "./hood_test.json"
import center_test_json from "./center_test.json"
import PaginationIndicator from "../components/PaginationIndicator.js";

const mockPerformanceMark = jest.fn();
window.performance.mark = mockPerformanceMark;

test('test hood card', () => {
    const hood = hood_test_json;
    const tree = renderer.create(
        <Router>
            <HoodCard
                hood={hood}
            />
        </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot();
})

test('test medical card', () => {
    const medical = medical_test_json;
    const tree = renderer.create(
        <Router>
            <MedicalCard
                medical={medical}
            />
        </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot();
})

test('test center card', () => {
    const center = center_test_json;
    const tree = renderer.create(
        <Router>
            <CenterCard
                center={center}
            />
        </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot();
})

test('test hood details', () => {
    const hood = hood_test_json;
    const tree = renderer.create(
        <Router>
            <HoodDetails
                hood={hood}
            />
        </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot();
})

test('test medical details', () => {
    const medical = medical_test_json;
    const tree = renderer.create(
        <Router>
            <MedicalDetails
                medical={medical}
            />
        </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot();
})

test('test center details', () => {
    const center = center_test_json;
    const tree = renderer.create(
        <Router>
            <CenterDetails
                center={center}
            />
        </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot();
})

test("Test whether the Navbar works", () => {
    const tree = renderer.create(
        <Router>
            <Navbar />
        </Router>
    )
    expect(tree).toMatchSnapshot()
})

test("Test the Navbar", async () => {
    render(
        <Router>
            <Navbar />
        </Router>
    );
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveTextContent("About");
    expect(navbar).toHaveTextContent("Home");
    expect(navbar).toHaveTextContent("Neighborhoods");
    expect(navbar).toHaveTextContent("Medical Facilities");
    expect(navbar).toHaveTextContent("Test Centers");
});

test("Test Loading", async () => {
    const tree = renderer.create(
        <Loading />
    )
    expect(tree).toMatchSnapshot()
})

test("Test Indicator", async () => {
    const tree = renderer.create(
        <PaginationIndicator />
    )
    expect(tree).toMatchSnapshot()
})

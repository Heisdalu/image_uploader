import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Drag from "./Drag";
import { setup } from "@/utils";
import Pic from "../../../public/Sun_fill.svg";
import { mock } from "node:test";

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "mocked file url");
  //   global.FormData = jest.fn().mockImplementation(() => ({
  //     append: jest.fn(),
  //   }));
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("Drag Component", () => {
  test("should have input file and its atrribute in the dom", () => {
    render(<Drag formUpdate={jest.fn()} />);

    const file = screen.getByTestId("file_upload");
    expect(file).toBeInTheDocument();
    expect(file).toHaveAttribute("accept");
  });

  test("should only accept an image type", async () => {
    const mock = jest.fn();
    const mockFileList = {
      0: new File(["image"], "example.jpg", {
        type: "video/mp4",
      }),
      length: 1,
    } as any;
    render(<Drag formUpdate={mock} />);
    const file: HTMLInputElement = screen.getByTestId("file_upload");

    jest.spyOn(file, "files", "get").mockReturnValue(mockFileList);

    await fireEvent.change(file);
    await waitFor(() => {
      expect(mock).toHaveBeenCalledTimes(0);
    });
  });

  test("should trigger function prop when there is an image upload", async () => {
    const mock = jest.fn();
    render(<Drag formUpdate={mock} />);
    const form = new FormData();

    const mockFileList = {
      0: new File(["image"], "example.jpg", {
        type: "image/jpeg",
      }),
      length: 1,
    } as any;
    form.append("file", mockFileList);
    const file: HTMLInputElement = screen.getByTestId("file_upload");
    jest.spyOn(file, "files", "get").mockReturnValue(mockFileList);

    await fireEvent.change(file);

    await waitFor(() => {
      expect(mock).toHaveBeenCalledTimes(1);

      expect(mock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: form,
          url: "mocked file url",
        })
      );
    });
  });

  test("should have a blue background when an image is dragged in drop box and white when dragged away", async () => {
    render(<Drag formUpdate={jest.fn} />);
    const container = screen.getByTestId("container");
    const outer = screen.getByTestId("outer") as HTMLDivElement;
    const inner = container.querySelector(".inner") as HTMLDivElement;

    expect(outer).toHaveClass("bg-[#fff]");

    // check presence of the classname
    expect(outer).toHaveClass("outer");
    expect(inner).toHaveClass("inner");

    //   jest.spyOn(container.addEventListener, '')
    const event = new Event("dragleave", { bubbles: true });
    Object.defineProperty(event, "relatedTarget", {
      value: outer,
    });

    await fireEvent(container, event);

    await waitFor(() => {
      //framer animation on the drop location
      expect(outer).toHaveStyle("background-color: #c2daf9");
      expect(inner).toHaveStyle("border-width: 0px");
    });

    // should show white background when image is dragged away from drop box
    const event2 = new Event("dragleave", { bubbles: true });
    Object.defineProperty(event2, "relatedTarget", {
      value: container,
    });

    await fireEvent(container, event2);

    await waitFor(() => {
      expect(outer).toHaveStyle("background-color: #fff");
      expect(inner).toHaveStyle("border-width: 2px");
    });
  });

  test("should accept image and trigger prop functin when image is dropped", async () => {
    const mockFn = jest.fn();
    const mockFileList = {
      0: new File(["image"], "example.jpg", {
        type: "image/jpeg",
      }),
      length: 1,
    } as any;
    render(<Drag formUpdate={mockFn} />);
    const dropBox = screen
      .getByTestId("container")
      .querySelector(".outer") as HTMLDivElement;

    fireEvent.drop(dropBox, {
      dataTransfer: {
        files: mockFileList,
      },
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({
          value: new FormData(),
          url: "mocked file url",
        })
      );
    });
  });

  test("should prevent default and stop propagation", async () => {
    render(<Drag formUpdate={jest.fn} />);

    const defaultDropMock = jest.spyOn(Event.prototype, "preventDefault");
    const dropstopPropagateMock = jest.spyOn(
      Event.prototype,
      "stopPropagation"
    );

    fireEvent.drop(window);
    fireEvent.dragEnter(window);
    fireEvent.dragOver(window);
    await waitFor(() => {
      expect(defaultDropMock).toHaveBeenCalled();
      expect(dropstopPropagateMock).toHaveBeenCalled();
    });
  });
});

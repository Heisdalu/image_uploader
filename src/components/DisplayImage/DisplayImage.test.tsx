import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DisplayImage from "./index";
import { setup } from "@/utils";
import { act } from "react";

const mockUrl = "http://mockeed_url";

afterAll(() => {
  jest.clearAllMocks();
});

describe("display component", () => {
  test("should have display image box and download button", () => {
    render(<DisplayImage url={mockUrl} />);
    const image = screen.getByRole("img");
    const button = screen.getByRole("button");
    expect(image).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // screen.debug(image);
  });

  test("should have a link created when download button is clicked", async () => {
    render(<DisplayImage url={mockUrl} />);
    const button = screen.getByRole("button");
    const link = screen.queryByRole("link");
    const linkMock = jest.fn();
    const revokeObject = jest.fn();
    global.URL.revokeObjectURL = revokeObject;

    // jest.spyOn(new Date()).mockResolvedValue(2000 as never);
    const doc = jest.spyOn(document, "createElement").mockReturnValue({
      href: "",
      download: "",
      click: linkMock,
    } as never);
    const append = jest
      .spyOn(document.body, "appendChild")
      .mockImplementation(() => document.createDocumentFragment());

    const remove = jest
      .spyOn(document.body, "removeChild")
      .mockImplementation(() => document.createDocumentFragment());

    await fireEvent.click(button);
    await act(async () => {
      //must be called with an a tag
      expect(doc).toHaveBeenCalledWith("a");
      //append and remove is triggered
      // must have href, download and click attribute
      expect(append).toHaveBeenCalled();
      expect(append).toHaveBeenCalledWith(
        expect.objectContaining({
          href: mockUrl,
          download: "image.jpg",
          click: linkMock,
        })
      );
      expect(linkMock).toHaveBeenCalled();
      expect(remove).toHaveBeenCalled();
      expect(revokeObject).toHaveBeenCalled();
      expect(revokeObject).toHaveBeenCalledWith(mockUrl);
    });
  });
});

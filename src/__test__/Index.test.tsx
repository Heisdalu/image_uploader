import Index from "@/pages/index";
import { setup } from "@/utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "http://mocked_file_url");
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: () => ({
      addListener: jest.fn(),
    }),
  });
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("Index page", () => {
  test("should display drag component first", () => {
    render(<Index />);
    expect(screen.getByTestId("container")).toBeInTheDocument();
    expect(screen.getByTestId("outer")).toBeInTheDocument();
    expect(screen.getByTestId("file_upload")).toBeInTheDocument();
  });

  test("should toggle dark mode", async () => {
    const { user } = setup(<Index />);
    const main = screen.getByTestId("main");
    const btn = screen.getByRole("button");
    // no dark mode before click
    expect(main).not.toHaveClass("dark");
    await user.click(btn);
    expect(main).toHaveClass("dark");
  });

  test("should display a toast error when wrong type format is dropped", async () => {
    render(<Index />);

    // video file not supported
    const mockFile = {
      0: new File(["video"], "example.jpg", {
        type: "video/mp3",
      }),
    };
    const dropBox: HTMLDivElement = screen.getByTestId("outer");

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: () => ({}),
    });

    await fireEvent.drop(dropBox, {
      dataTransfer: {
        files: mockFile,
      },
    });

    await waitFor(() => {
      const toast = screen.getByText("Upload an image");
      expect(toast).toBeInTheDocument();
    });
  });

  test("should display loading spinner when image is dropped and after 5 secs, display image should be visible", async () => {
    // video file not supported
    const mockFile = {
      0: new File(["image"], "example.jpg", {
        type: "image/jpeg",
      }),
    };
    render(<Index />);

    const dropBox: HTMLDivElement = screen.getByTestId("outer");
    const loading = screen.queryByTestId("loading");

    // not present
    expect(loading).toBeNull();

    await fireEvent.drop(dropBox, {
      dataTransfer: {
        files: mockFile,
      },
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toBeInTheDocument();
      const loading = screen.getByTestId("loading");
      expect(loading).toBeInTheDocument();
      // screen.getByTestId(/download/i);
    });
    await waitFor(
      () => {
        //no loading state
        expect(screen.queryByTestId("loading")).toBeNull();
        expect(screen.getByText(/download/i)).toBeInTheDocument();
        screen.debug();
      },
      {
        timeout: 4500,
        interval: 100,
      }
    );
  });
});

/*
check if wrong image is passed
check when image is passed should show, loading compoent
check loading is done, show display image...
*/

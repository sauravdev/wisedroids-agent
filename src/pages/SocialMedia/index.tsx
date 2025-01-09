import { Loader, CheckSquare, FileText, Image as ImageIcon, Video } from 'lucide-react';

export function SocialMedia () {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Generative Viral Posts
      </h1>

      <form
        method="POST"
        id="form"
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <div>
          <label
            htmlFor="keyword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Enter your niche topic keyword (e.g. GenerativeAI, Cooking, etc.):
          </label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            placeholder="Enter keyword..."
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="source"
            className="block text-gray-700 font-semibold mb-2"
          >
            Choose the sources you want to scrape the latest data:
          </label>
          <div id="source" className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                id="arxiv"
                name="source[]"
                value="arxiv"
                className="mr-2"
              />
              arxiv
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                id="youtube"
                name="source[]"
                value="youtube"
                className="mr-2"
              />
              youtube
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                id="twitter"
                name="source[]"
                value="twitter"
                className="mr-2"
              />
              twitter
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                id="feedly"
                name="source[]"
                value="feedly"
                className="mr-2"
              />
              feedly
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="N"
            className="block text-gray-700 font-semibold mb-2"
          >
            Number of posts to return per target:
          </label>
          <input
            type="number"
            id="N"
            name="N"
            defaultValue={1}
            min={1}
            max={100}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="converted_source"
            className="block text-gray-700 font-semibold mb-2"
          >
            Choose the target platform of your choice:
          </label>
          <div id="converted_source" className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                id="twitter"
                name="converted_source[]"
                value="twitter"
                className="mr-2"
              />
              Twitter
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                id="linkedin"
                name="converted_source[]"
                value="linkedin"
                className="mr-2"
              />
              LinkedIn
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                id="blog"
                name="converted_source[]"
                value="blog"
                className="mr-2"
              />
              Blog
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                id="instagram"
                name="converted_source[]"
                value="instagram"
                className="mr-2"
              />
              Instagram
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="content_types"
            className="block text-gray-700 font-semibold mb-2"
          >
            Choose content type(s):
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="content_types"
                value="text"
                defaultChecked
                className="mr-2"
              />
              <FileText className="h-5 w-5 text-indigo-600 mr-2" /> Text
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="content_types"
                value="image"
                className="mr-2"
              />
              <ImageIcon className="h-5 w-5 text-indigo-600 mr-2" /> Image
            </label>
            {/* <label className="flex items-center">
              <input
                type="checkbox"
                name="content_types"
                value="video"
                className="mr-2"
              />
              <Video className="h-5 w-5 text-indigo-600 mr-2" /> Video
            </label> */}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          <CheckSquare className="inline-block h-5 w-5 mr-2" /> Generate Viral Posts
        </button>
      </form>

      <div id="loader-overlay" className="hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <Loader className="h-16 w-16 text-white animate-spin" />
      </div>
    </div>
  );
};


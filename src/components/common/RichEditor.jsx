import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RichEditor = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-lg border">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: [
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "undo",
            "redo",
          ],
        }}
      />
    </div>
  );
};

export default RichEditor;
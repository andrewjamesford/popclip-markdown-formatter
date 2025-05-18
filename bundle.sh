mkdir -p build
cd build
# Create the new folder
mkdir -p MarkdownFormatter.popclipext

# Copy Config.ts to the new folder
cp ../Config.ts MarkdownFormatter.popclipext/
cp ../readme.md MarkdownFormatter.popclipext/

echo "Created Bundle"
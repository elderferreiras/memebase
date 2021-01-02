(
    echo "Begin build..."

    echo "Deleting existing build at ../../../templates/build"
    rm -rf ../../../templates/build;

    echo "Installing dependencies"
    yarn install;

    # Ensure the dashboard_beta template directory exists
    mkdir -p ../../../templates/build/


    echo "Building..."
    yarn build;
    # node contextLoader.js
    cp -R build ../../../templates/;
    rm -rf build;

    echo "Completed!"
)

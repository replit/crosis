{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.11";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    inherit (nixpkgs) lib;

    systems = [
      "x86_64-linux"
      "aarch64-linux"
      "x86_64-darwin"
      "aarch64-darwin"
    ];

    forEachSystem = f:
      lib.genAttrs systems (
        system:
          f (import nixpkgs {
            inherit system;
          })
      );
  in {
    checks = forEachSystem (pkgs: let
      package = builtins.fromJSON (builtins.readFile ./package.json);
      dependencies = pkgs.mkYarnModules {
        pname = package.name;
        inherit (package) version;
        packageJSON = ./package.json;
        yarnLock = ./yarn.lock;
        offlineCache = pkgs.fetchYarnDeps {
          yarnLock = ./yarn.lock;
          hash = "sha256-A4mm/ryF3Y2h1APjxDrC1uuYURWHvVf4W24uRnBHmh8=";
        };
      };
      src = lib.fileset.toSource {
        root = ./.;
        fileset = lib.fileset.unions [
          ./src
          ./src.browser
          ./debug
          ./package.json
          ./tsconfig.json
          ./jest.config.js
          ./.eslintrc.js
          ./.eslintignore
          ./.prettierrc.js
        ];
      };
      check = name: command:
        pkgs.runCommand "crosis-${name}" {
          inherit src;
          nativeBuildInputs = [pkgs.nodejs pkgs.yarn];
        } ''
          cp -R "$src" source
          chmod -R u+w source
          cd source
          export HOME="$TMPDIR"
          ln -s ${dependencies}/node_modules node_modules
          ${command}
          touch "$out"
        '';
    in {
      lint = check "lint" "yarn run lint";
      typecheck = check "typecheck" "yarn run tsc --noEmit";
      unit-tests = check "unit-tests" ''
        unset USER_KEY_ID USER_PRIVATE_KEY
        yarn run test:unit
      '';
    });

    devShells = forEachSystem (pkgs: {
      default = pkgs.mkShell {
        packages = with pkgs; [
          yarn
          python3
          nodejs
        ];
      };
    });
  };
}

{
  systems = ["x86_64-linux"];
  onlyBuild = [
    "checks.x86_64-linux.lint"
    "checks.x86_64-linux.typecheck"
  ];
  timeout = 1800;
}

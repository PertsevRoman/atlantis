interface Repository {
  repoName: string;
  locks: number;
}

interface Lock {
}

interface AtlantisState {
  repositories: Repository[];
  locks: Lock[];
}

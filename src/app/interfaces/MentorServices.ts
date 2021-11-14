export type MentorServices = {
  readonly messaging: {
		readonly enabled: boolean;
		readonly price?: number;
		readonly onDemand: boolean;
	};
	readonly projectReview: {
		readonly enabled: boolean;
		readonly price?: number;
		readonly onDemand: boolean;
	}
};

export default {

  namespaced: true,

  state: {
    specification: {
      case: {
          title: "Case",
          next: ["analysis"],
      },
      analysis: {
          title: "Analysis",
          next: ["strategy"],
      },
      strategy: {
          title: "Strategy",
          next: ["action"],
      },
      action: {
          title: "Action",
          next: ["evaluation"],
      },
      evaluation: {
          title: "Evaluation",
          next: ["strategy", "action"],
      }
    }
  }

};

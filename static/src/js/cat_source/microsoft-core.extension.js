

(function(SF) {

    let filte_size = '50';
    let filter_type = 'regular_intervals';
    $.extend(UI, {

    });

    $.extend(SF, {

        closeFilter: function (  ) {
            CatToolActions.closeSubHeader();
            this.open = false;
        }

    });

    function overrideSegmentsFilter( SegmentsFilter ) {
        let originalComponentDidMount =  SegmentsFilter.prototype.componentDidMount;
        let originaldefaultState =  SegmentsFilter.prototype.defaultState;
        SegmentsFilter.prototype.componentDidMount = function (  ) {

            let storedState = SegmentFilter.getStoredState();
            if (config.isReview && !storedState.reactState) {
                originalComponentDidMount.apply(this);
                this.doSubmitFilter();
            } else {
                originalComponentDidMount.apply(this);
            }
        };

        SegmentsFilter.prototype.defaultState = function (  ) {
            let storedState = SegmentFilter.getStoredState();
            if (config.isReview && !storedState.reactState) {
                return {
                    searchSettingsOpen: false,
                    selectedStatus: '',
                    samplingEnabled: true,
                    samplingType: filter_type,
                    samplingSize: filte_size,
                    filtering: false,
                    filteredCount: 0,
                    segmentsArray: [],
                    moreFilters: this.moreFilters

                }
            } else {
                return originaldefaultState.apply(this);
            }
        }
    }
    overrideSegmentsFilter(SegmentFilter);

})(SegmentFilter) ;
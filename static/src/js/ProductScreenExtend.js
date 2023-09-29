odoo.define('dbs_pos_loyalty_ensure_positive_points.ProductScreenExtend', function (require) {
    'use strict';

    const ProductScreen = require('point_of_sale.ProductScreen');
    const Registries = require('point_of_sale.Registries');
    const { Gui } = require('point_of_sale.Gui');

	const ProductScreenExtend = (ProductScreen) =>
		class extends ProductScreen {
			constructor() {
				super(...arguments);
			}
        
        ensureNoReward() {
            let order = this.env.pos.get_order();
            for (var line of order.get_orderlines()){
                if (line.get_reward()) { 
                    order.remove_orderline(line);
                }
            }
        }

        async _onClickPay() {
            let order = this.env.pos.get_order();
            let config = this.env.pos.config;
            var isPositive = true;

            if (!config.module_pos_loyalty || !order.get_client()) {
                await super._onClickPay();
                return
            }
            if (order.get_spent_points()<0) {
                await Gui.showPopup('ErrorPopup', {
                    title: ('Validation Error'),
                    body: ('You cannot spend negative points!'),
                });
                this.ensureNoReward()
                isPositive = false;
            }
            if (order.get_spent_points()>order.get_current_points()) {
                await Gui.showPopup('ErrorPopup', {
                    title: ('Validation Error'),
                    body: ('You cannot use more points than you have!'),
                });
                this.ensureNoReward()
                isPositive = false;
            }
            if (isPositive) {
                await super._onClickPay();
            }
        }
        }

    Registries.Component.extend(ProductScreen, ProductScreenExtend);

    return ProductScreen;
});
